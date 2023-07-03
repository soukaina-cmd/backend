const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // table
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error(" E-mail non valide");
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      // is length tu doit donne deux caractere  maximem et un minimum 
      if (!validator.islength(v, { min: 4, max: 20 }))
        throw new Error(" Le mot de passe doit etre entre 4 et 20 caracteres");
    },
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

//  comment cette fonction va marcher : on va partir au fichier server a la partir a user/ login  on va rentre lemail et le mot de passe apres on va partir au ficher user on va recupere luser apres on va
// verifier si luser existe ou pas la suite et on commentaire
userSchema.statics.findUser = async (email, password) => {
  // recupere lutilisateur et recupere lemailno
  const user = User.findOne({ email });
  // verification si luser existe ou pas  si il nexeste ou pas on va renvoyer une nouvelle erreur
  if (!user) throw new Error("Erreur, pas possible de se connecter");
  // verifier le mot de passe a laide de bcrypt
  // password celui que  (luser) va entre user.passeword(celui qui est dans base donnee)
  console.log(user.password);
  console.log(password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // ici on va verifier si le mot de passe et bon
  if (!isPasswordValid)
    throw new Error("Erreur, pas possible de se connecter!");
};

//  elle genere une chaine de caractere save f la base de donne et apres elle te le donne
// foo
userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "foo");
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
