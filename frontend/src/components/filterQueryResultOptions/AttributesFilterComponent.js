import { Form } from "react-bootstrap";


//filter attributes of a category(only some categories have attribute fields)
const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
//   console.log(attrsFilter);
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter, idx) => ( //map through attribute key
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{filter.key}</b>
            </Form.Label>
            {filter.value.map((valueForKey, idx2) => (  //map through attribute value
              <Form.Check key={idx2} type="checkbox" label={valueForKey} onChange={e => {
                 setAttrsFromFilter(filters => {
                     //didn't choose any attr
                     if (filters.length === 0) {
                         return [{ key: filter.key, values: [valueForKey] }];
                     } 

                    //if filter is not empty, find item whose item.key=filter.key(clicked key)
                    let index = filters.findIndex((item) => item.key === filter.key);
                    if (index === -1) {
                        // if not found (if clicked key is not inside filters), return old filters and new key
                        return [...filters, { key: filter.key, values: [valueForKey] }];
                    }

                    // if clicked key is inside filters and checked
                    if (e.target.checked) {
                        filters[index].values.push(valueForKey); //push this value to filters
                        let unique = [...new Set(filters[index].values)];
                        filters[index].values = unique;
                        return [...filters]; //return modified filters
                    }

                    // if clicked key is inside filters and unchecked(if already clicked on a attr, then uncheck it)
                    let valuesWithoutUnChecked = filters[index].values.filter((val) => val !== valueForKey);
                    filters[index].values = valuesWithoutUnChecked;
                    if (valuesWithoutUnChecked.length > 0) {
                        return [...filters];
                    } else {
                        let filtersWithoutOneKey = filters.filter((item) => item.key !== filter.key); //only keep the item not unchecked
                        return [...filtersWithoutOneKey];
                    }

                 }) 
              }} />
            ))}
          </div>
        ))}
    </>
  );
};

export default AttributesFilterComponent;

