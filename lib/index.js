const semver = require('semver')
const lockfile = require('@yarnpkg/lockfile')

function dedupe (content) {
  const { type, object: data } = lockfile.parse(content)
  if (type !== 'success') throw new Error('lockfile parse is not success')

  const packages = Object.create(null)
  for (const key of Object.keys(data)) {
    const { name } = parsePackageString(key)
    if (!packages[name]) packages[name] = []
    packages[name].push(data[key])
  }

  const cleaned = Object.create(null)
  for (const key of Object.keys(data)) {
    const { name, version } = parsePackageString(key)
    cleaned[key] = packages[name].reduce((best, current) => {
      if (!semver.satisfies(best.version, version)) return current
      if (!semver.satisfies(current.version, version)) return best
      return semver.gt(best.version, current.version) ? best : current
    })
  }

  return lockfile.stringify(cleaned)
}

function parsePackageString (key) {
  const [name, version] = key.match(/^(.*)@(.*)$/).slice(1, 3)
  return { name, version }
}

module.exports = dedupe
