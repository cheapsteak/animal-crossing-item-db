import React, { Suspense, useState, useMemo } from 'react';
import { useItemsData } from './useItemsData';
import { Furniture, Fish, Bug } from './types';

const Foo = () => {
  const { furniture, fish, bugs } = useItemsData({ hemisphere: 'northern' });
  const [searchQuery, setSearchQuery] = useState('');

  const queryRegex = useMemo(() => {
    return new RegExp(
      '(?:[\\s]|^)' + // don't start match in the middle of a word
        // e.g. searchQuery is `aqua wall`, match `aqua tile wall`
        searchQuery
          .split(' ')
          // assume subsequent words in search are also the start of words
          .join('.*\\s'),
      'i',
    );
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    const allItems: Array<Furniture | Fish | Bug> = [
      ...bugs,
      ...fish,
      ...furniture,
    ];
    return allItems.filter((item) => queryRegex.test(item.name));
  }, [queryRegex, furniture, fish, bugs]);

  const numberFormatter = useMemo(() => new Intl.NumberFormat(), []);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {searchResults.slice(0, 50).map((x) => (
          <div key={x.type + x.name}>
            <span>{x.name}</span>
            {x.imageName && (
              <img src={`${x.imageName}`} style={{ width: 32 }} alt="" />
            )}
            {x.type !== 'furniture' ? (
              <span>{numberFormatter.format(x.price)}</span>
            ) : (
              <span>
                {x.price.sell?.amount && (
                  <>
                    sell: {numberFormatter.format(x.price.sell?.amount)}{' '}
                    {x.price.sell?.currency};
                  </>
                )}{' '}
                {x.price.buy?.amount && (
                  <>
                    buy: {numberFormatter.format(x.price.buy?.amount)}{' '}
                    {x.price.buy?.currency}
                  </>
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const GlobalSuspenseFallback = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <Foo />
      </Suspense>
    </div>
  );
}

export default App;
