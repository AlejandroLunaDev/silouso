class UserAdmin {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this._id = user._id;

    this.email = user.email;
    this.role = user.role;
    this.last_connection = user.last_connection;
  }
}

module.exports = UserAdmin;
