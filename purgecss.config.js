module.exports = {
  content: ['src/**/*.html', 'src/**/*.js'], // Files to analyze for used CSS classes
  css: ['src/**/*.css'], // CSS files to be purged
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [], // Extractor for identifying used CSS classes
};
