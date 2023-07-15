type DataProps = {
  id: string;
  content: string;
  searchQuery: string;
};

type MessageProps = {
  text: string;
  createdAt: FieldValue;
  user: {
    id: string | null | undefined;
    name: string | null | undefined;
    profile?: string | null;
  };
};

export type { previewPageTextProps, DataProps, MessageProps };
