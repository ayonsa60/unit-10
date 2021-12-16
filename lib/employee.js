class Employee {
    
    constructor(name, id, email) {
    Employee.name = name;
    Employee.id = id;
    Employee.email = email;
    }

    getName() {
    return Employee.name;
    }

    getId() {
    return Employee.id;
    }

    getEmail() {
    return Employee.email;
    }

    getRole() {
    return "Employee";
    }

}

module.exports = Employee;