const flattenNestedStruct = (
    nestedObject, key_field, ident_field, default_ident = '2') => {
  if (!key_field
      || !nestedObject
      || Object.keys(nestedObject).length === 0
      || !nestedObject[key_field]
  ) {
    return {};
  }

  let children = {};

  for (const child of nestedObject[key_field]) {
    const new_mapped_child = Object.assign({}, child);
    new_mapped_child['parent'] = nestedObject[ident_field] ?? default_ident;

    if (new_mapped_child[ident_field]) {

      // represent children with their ident_field value. If no child -> []
      if (new_mapped_child[key_field]) {
        new_mapped_child[key_field] =
            new_mapped_child[key_field]
                .map(x => x ? x[ident_field] : null)
                .filter(x => !!x);
      }
      else {
        new_mapped_child[key_field] = [];
      }

      children[new_mapped_child[ident_field]] = new_mapped_child;
      const child_of_child = flattenNestedStruct(child, key_field, ident_field, default_ident);

      children = {...children, ...child_of_child};
    }
  }
  return children;
};

export {flattenNestedStruct};
