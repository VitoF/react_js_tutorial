function reactRender(domHtml,domObj){
    React.render(
      domHtml,
      domObj[0]
    );
}

reactRender(
    <HeadingHandlers />,
    $('.panel-heading')
);

reactRender(
    <TableList url="/json/data.json" />,
    $('.panel-body')
);