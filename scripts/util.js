module.exports = {
    safe: (fn) => {
        (async () => {
            await Promise.resolve(fn());
        })().catch(e => {
            console.error(`Oh no! Something went wrong: ${e.message}`);
            process.exit(1);
        });
    }
};
