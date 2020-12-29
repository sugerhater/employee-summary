// TODO: Write code to define and export the Employee class

//will need a function to prompt user and pass it into employee.
class Employee{
  constructor(name,id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = 'Employee'
  }

  getName() {
    return this.name
  };

  getID() {
    return this.id
  }
  
  getEmail() {
    return this.email
  }

  getRole() {
    return this.role
  }
}

module.exports = Employee;