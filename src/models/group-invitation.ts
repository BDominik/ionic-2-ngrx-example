import { Group } from './group';
import { User } from './user';

export interface GroupInvitation {
  id: number;
  group: Group;
  invitee: User;
  inviter: User;
  accepted_at: string;
}
