const createUser = ({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) => ({
  firstname,
  lastname,
  fullname: `${firstname} ${lastname}`,

  editFirstname: (name: string) => {
    firstname = name;
  },

  delete: () => {
    // calll delete api
  },
});

class User {
  firstname: string;
  lastname: string;
  fullname: string;

  constructor({
    firstname,
    lastname,
  }: {
    firstname: string;
    lastname: string;
  }) {
    this.firstname = firstname;
    this.lastname = lastname;

    this.fullname = `${firstname} ${lastname}`;
  }

  editFirstname(name: string) {
    this.firstname = name;
  }

  delete() {
    // calll delete api
  }
}

const userA = createUser({ firstname: 'Foo', lastname: 'Bar' });
const userB = new User({ firstname: 'John', lastname: 'Doe' });
