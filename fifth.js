console.log('Hello OOP');

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear
}

Person.prototype.happyBirthDay = function () {
    console.log(`Happy Birth Day ${this.firstName}`);
}

Person.prototype.notBirthDay = function () {
    console.log(`today is not birthday`);
}

const badrul = new Person('বদরুল', 1998)
const utsho = new Person('utsho', 1998)
const manna = new Person('মান্না', 1998)


console.log(badrul, utsho, manna);
console.log(Array.prototype);
console.log(Person.prototype);

class PersonCl {
    constructor(name, experience) {
        this.name = name;
        this.experience = experience;
    }

    printInfo() {
        console.log(`This is ${this.name} & my experience is ${this.experience} years.`);
    }

    // Getter for name
    get personName() {
        return this.name;
    }

    // Setter for experience with a minimum value
    set minExperience(exp) {
        if (exp < 0) {
            alert("Experience cannot be negative!");
        } else {
            this.experience = exp;
        }
    }

    // Static Method
    static functionInfo() {
        alert(`এই ফাংশনটি শুধু মাত্র পার্সনাল ডাটার জন্য`);
    }
}

class Developer extends PersonCl {
    constructor(name, experience, lang) {
        super(name, experience);
        this.lang = lang;
    }

    printDevInfo() {
        console.log(`I am ${this.name}, a developer with ${this.experience} years of experience in ${this.lang}.`);
    }
}

const bAlam = new PersonCl('ডেভোলাপার বদরুল', 'মাত্র আট বছর')
const bDev = new Developer('Dev B Alam', 3, 'বাংলা')
console.log(bDev.printInfo());
console.log(bDev.printDevInfo());

console.log(bAlam);
console.log(bDev);


// example of private 

class BankAccount {
    bankName = 'JavaScript Bank';

    #balance = 0;
    #accountNumber;

    constructor(owner, accountNumber) {
        this.owner = owner;
        this.#accountNumber = accountNumber;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            console.log(`Deposited: $${amount}. Current balance: $${this.#balance}`);
        } else {
            alert(`Balance Should Positive Value`)
        }
    }

    #getAccountNumber() {
        return this.#accountNumber;
    }

    showAccountNumber() {
        console.log(`Account Number: ${this.#getAccountNumber()}`);
    }
}

const bAccount = new BankAccount('Md Badrul Alam', 102030)

console.log('বদরুল আলম এর একাউন্ট রেজিঃ', bAccount);
// console.log(bAccount.#accountNumber); // working fine
// bAccount.#balance = 100;