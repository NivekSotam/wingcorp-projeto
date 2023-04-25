const { Model } = require('objection');
class Cursos extends Model {
    static get cursos() {
      return 'cursos';
    }
}

module.exports = Cursos;