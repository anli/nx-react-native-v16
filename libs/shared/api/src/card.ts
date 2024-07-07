export const smallAspectRatio = 1;
export const mediumAspectRatio = 0.637;
export const largeAspectRatio = 0.55;

export type Card = {
  imageUrl: string;
  aspectRatio: number;
  visible?: boolean;
};
