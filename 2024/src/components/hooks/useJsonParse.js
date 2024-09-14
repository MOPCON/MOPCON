export function useJsonParse(content) {
  const paragraphs = content.split(/[\n]/);

  const isListItem = (text) => {
    return text.trim().startsWith("-") || /^\d+\./.test(text.trim());
  };

  const renderContent = () => {
    let listItems = [];
    const renderedContent = [];

    paragraphs.forEach((paragraph, index) => {
      if (isListItem(paragraph)) {
        const content = paragraph.replace(/^-|\d+\./, "").trim();
        listItems.push(<li key={`li-${index}`}>{content}</li>);
      } else {
        if (listItems.length > 0) {
          renderedContent.push(
            <ul key={`ul-${index}`} className="list-decimal list-inside">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        renderedContent.push(<p key={`p-${index}`}>{paragraph}</p>);
      }
    });

    if (listItems.length > 0) {
      renderedContent.push(
        <ul key={`ul-last`} className="list-decimal list-inside">
          {listItems}
        </ul>
      );
    }

    return renderedContent;
  };

  return renderContent();
}
