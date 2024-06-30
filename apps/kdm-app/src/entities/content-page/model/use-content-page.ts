import { ContentPages } from '../../../shared/api';

export const useContentPage = (id: string) => {
  return { data: ContentPages.find((_item) => _item.id === id) };
};
