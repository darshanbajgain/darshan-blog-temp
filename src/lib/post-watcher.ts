import chokidar from 'chokidar';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { sendBroadcast } from './convertkit';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Keep track of processed files to avoid duplicate notifications
const processedFiles = new Set<string>();

export function watchPosts() {
  console.log('🔄 Initializing post watcher...');
  console.log('📁 Watching directory:', postsDirectory);

  // Initialize watcher
  const watcher = chokidar.watch(path.join(postsDirectory, '*.md'), {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });

  watcher
    .on('add', async (filepath) => {
      console.log('📝 New file detected:', filepath);
      const filename = path.basename(filepath);
      
      if (processedFiles.has(filename)) {
        console.log('⏭️ File already processed:', filename);
        return;
      }

      try {
        const fileContents = fs.readFileSync(filepath, 'utf8');
        const { data, content } = matter(fileContents);
        
        console.log('📨 Processing post:', {
          title: data.title,
          date: data.date,
          filename
        });

        // Remove the time restriction to test in staging
        await sendBroadcast({
          title: data.title,
          description: data.description,
          content: content,
          slug: filename.replace(/\.md$/, '')
        });

        console.log('✅ Broadcast sent successfully for:', data.title);
        processedFiles.add(filename);

      } catch (error) {
        console.error('❌ Error processing post:', {
          filename,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
      }
    })
    .on('error', error => {
      console.error('❌ Watcher error:', error);
    });

  return watcher;
}
