class UserCurrent {
  constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.cartId = user.cartId;
    this.role = user.role;
    this.avatar = user.avatar;
    this.documents = user.documents; // Incluye documentos si es necesario
  }
}
module.exports = UserCurrent;
