const lockfile = require('@yarnpkg/lockfile')
const semver = require('semver')

module.exports = function (content) {
  const { type, object: data } = lockfile.parse(content)
  if (type !== 'success') throw new Error('lockfile parse is not success')

  const packages = {}
  for (const key of Object.keys(data)) {
    const { packagename } = parseKey(key)
    if (!packages[packagename]) packages[packagename] = []
    packages[packagename].push(data[key])
  }

  const cleaned = {}
  for (const key of Object.keys(data)) {
    const { packagename, version } = parseKey(key)
    cleaned[key] = packages[packagename].reduce((best, current) => {
      if (!semver.satisfies(best.version, version)) return current
      if (!semver.satisfies(current.version, version)) return best
      return semver.gt(best.version, current.version) ? best : current
    })
  }

  return lockfile.stringify(cleaned)
}

function parseKey (key) {
  const [packagename, version] = key.match(/(.*)@(.*)$/).slice(1, 3)
  return { packagename, version }
}
