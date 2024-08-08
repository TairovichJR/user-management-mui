import { IUser } from "./model";

export const userData: IUser[] = [
    { id: 1, imgSource: require(`./assets/images/avatar-1.webp`), name: 'John Doe', email: "john.doe@gmail.com", country: 'United States', countryCode: 'US', phoneNumber: '202-555-0147', state: 'Virginia', city: 'Mclean', address: '123 main street', zip: '22102', company: 'ABC Corp', role: 'Admin', status: 'Active' },
    { id: 2, imgSource: require(`./assets/images/avatar-2.webp`), name: 'Alex Jones' ,email: "alex.jones@gmail.com", country: 'Great Britain', countryCode: 'GB', phoneNumber: '20 7946 0958', state: 'Virginia', city: 'Mclean',address: '123 main street', zip: '22102', company: 'XYZ Inc', role: 'User', status: 'Active' },
    { id: 3, imgSource: require(`./assets/images/avatar-3.webp`), name: 'Kevin Lee', email: "kevin.lee@gmail.com",country: 'Great Britain',countryCode: 'DE', phoneNumber: '30 1234567', state: 'Virginia', city: 'Mclean', address: '123 main street', zip: '22102',company: 'XYZ Inc', role: 'Developer', status: 'Active' },
    { id: 4, imgSource: require(`./assets/images/avatar-4.webp`), name: 'Bob Peterson',email: "bob.peterson@gmail.com",country: 'Great Britain', countryCode: 'FR',phoneNumber: '1 23 45 67 89',state: 'Virginia', city: 'Mclean',address: '123 main street', zip: '22102', company: 'XYZ Inc', role: 'User', status: 'Rejected' },
    { id: 5, imgSource: require(`./assets/images/avatar-5.webp`), name: 'Omon Lee', email: "omon.lee@gmail.com",country: 'Great Britain', countryCode: 'CA',phoneNumber: '416-555-0199',state: 'Virginia', city: 'Mclean', address: '123 main street', zip: '22102',company: 'XYZ Inc', role: 'CPA', status: 'Active' },
    { id: 6, imgSource: require(`./assets/images/avatar-6.webp`), name: 'Robert Smith', email: "robert.smith@gmail.com",country: 'Great Britain', countryCode: 'AU', phoneNumber: '2 1234 5678',state: 'Virginia', city: 'Mclean',address: '123 main street', zip: '22102', company: 'XYZ Inc', role: 'CEO', status: 'Banned' },
    { id: 7, imgSource: require(`./assets/images/avatar-7.webp`), name: 'Sam Peterson', email: "sam.peterson@gmail.com",country: 'Great Britain', countryCode: 'JP',phoneNumber: '3-1234-5678', state: 'Virginia', city: 'Mclean',address: '123 main street', zip: '22102',company: 'XYZ Inc', role: 'User', status: 'Banned' },
    { id: 8, imgSource: require(`./assets/images/avatar-8.webp`), name: 'Omar Sulaiman', email: "omar.sulaiman@gmail.com", country: 'Great Britain',countryCode: 'IN',phoneNumber: '22 1234 5678', state: 'Virginia', city: 'Mclean',address: '123 main street', zip: '22102',company: 'XYZ Inc', role: 'Cook', status: 'Rejected' },
    { id: 9, imgSource: require(`./assets/images/avatar-9.webp`), name: 'Tomas Williams', email: "tomas.williams@gmail.com", country: 'Great Britain',countryCode: 'BR',phoneNumber: '11 91234-5678',state: 'Virginia', city: 'Mclean', address: '123 main street', zip: '22102',company: 'XYZ Inc', role: 'Driver', status: 'Active' },
  ];

  export const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
  ];