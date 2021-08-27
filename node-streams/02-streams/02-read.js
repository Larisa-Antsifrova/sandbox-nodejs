process.stdin.on('data', chunk => {
  console.log(`Block: ${chunk.length} - ${chunk.toString()}`);
});
