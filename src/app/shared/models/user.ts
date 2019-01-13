/**
 * Information about a user
 */

export interface User {
  id: string;

  /**
   * The Users Email
   */
  email: string;

  /**
   * Is the user currently active.
   */
  active?: boolean;

  /**
   * The users roles
   */
  roles: UserRoles[];
}

export enum UserRoles {
  Guest = 'guest',

  Anonymous = 'anon',

  Admin = 'admin',

  Paid = 'paid'
}

