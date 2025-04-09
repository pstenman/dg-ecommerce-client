export interface ISearchResponse {
  items: ISearchItem[];
}

export interface ISearchItem {
    displayLink: string,
    formattedUrl: string,
    htmlFormattedUrl: string,
    htmlSnippet: string,
    htmlTitle: string,
    kind: string,
    labels: ILabel[],
    link: string
    pagemap: IPagemap,
    snippet: string,
    title: string,
  }
  
  interface IPagemap {
    cse_image: IImage[],
    cse_thumbnail?: ITumbnail[]
  }
  
  interface ILabel {
    displayName: string,
    label_with_op: string,
    name: string
  }
  
  interface ITumbnail {
    height: string,
    src: string,
    width: string
  }
  
  interface IImage {
    src: string
  }