// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, officeNumber){
    this.officeNumber = officeNumber;
  }

  getRole() {
    return 'Engineer';
  } 
  
}

module.exports = Engineer;
