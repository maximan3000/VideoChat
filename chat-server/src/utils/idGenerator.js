/**
 * Generator id`s
 * @yield {string}
 */
function* idGenerator() {
  let id = 1;
  for (;;) yield (id++).toString();
}

module.exports = idGenerator;
