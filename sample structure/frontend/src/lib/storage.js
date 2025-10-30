const storageArea = window.localStorage;

export const storage = {
  get(key) {
    try {
      return storageArea.getItem(key);
    } catch (error) {
      console.error('Failed to read from storage:', error);
      return null;
    }
  },
  set(key, value) {
    try {
      storageArea.setItem(key, value);
    } catch (error) {
      console.error('Failed to write to storage:', error);
    }
  },
  remove(key) {
    try {
      storageArea.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  },
  clear() {
    try {
      storageArea.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },
};
