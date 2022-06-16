// const path = require('path')
// const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//   cssModules: true,
//   cssLoaderOptions: {
//     localIdentName: '[path]___[local]___[hash:base64:5]',
//   }
// })
const path = require('path')
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true
})
module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}