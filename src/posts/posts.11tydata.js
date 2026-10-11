const fs = require('fs');

module.exports = {
	eleventyComputed: {
		lastmod: (data) => {
			try {
				// Grab the modified time from the post file
				const stats = fs.statSync(data.page.inputPath);
				const mtime = stats.mtime;

				// Grab the original post date and our modified date
				const originalDate = new Date(data.page.date).toISOString().split('T')[0];
				const modifiedDate = new Date(mtime).toISOString().split('T')[0];

				// Only return the lastmod if it's different from the original date
				if (modifiedDate !== originalDate) {
					return mtime;
				}

				return null;
			} catch (err) {
				console.error(`Error checking mtime for ${data.page.inputPath}`, err);
				return null;
			}
		}
	}
};