const { Model } = require('objection');

class Alunos extends Model {
    static get alunos() {
      return 'alunos';
    }
}


