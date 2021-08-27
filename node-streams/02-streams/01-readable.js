process.stdin.on('readable', () => {
  let chunk;

  while ((chunk = process.stdin.read()) !== null) {
    console.log(`Block: ${chunk.length} - ${chunk.toString()}`);
  }
});
