import { create } from 'zustand';
import { UserProfile, NotificationSettings } from '@/types/profile';
import { currentUser, defaultNotificationSettings } from '@/constants/profileMockData';

interface UserStore {
  // 상태
  user: UserProfile;
  notificationSettings: NotificationSettings;

  // 액션
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: currentUser,
  notificationSettings: defaultNotificationSettings,

  updateUserProfile: (profile) => {
    set((state) => ({
      user: {
        ...state.user,
        ...profile,
      },
    }));
  },

  updateNotificationSettings: (settings) => {
    set((state) => ({
      notificationSettings: {
        ...state.notificationSettings,
        ...settings,
      },
    }));
  },

  logout: () => {
    set({
      user: currentUser,
      notificationSettings: defaultNotificationSettings,
    });
  },
}));
