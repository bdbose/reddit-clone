import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Component = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get('https://www.reddit.com/r/ksi.json')
      .then((res) => {
        setData(res.data.data.children);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='home-wrapper'>
      <div className='home-post'>
        {loading ? (
          data.map(({ data }) => {
            let url;
            try {
              url = data.url;
            } catch {
              url = data.thumbnail;
            }
            return (
              <div className='inner-post' key={data.id}>
                <div className='vote-section'>
                  <img
                    style={{
                      transform: 'rotate(-90deg)',
                    }}
                    src={'/assets/arrow.png'}
                    alt=''
                  />
                  {data.ups}
                  <img
                    style={{
                      transform: 'rotate(90deg)',
                    }}
                    src={'/assets/arrow.png'}
                    alt=''
                  />
                </div>
                <div className='preview-section'>
                  <div className='post-title'>{data.title}</div>
                  {data.thumbnail !== 'self' ? (
                    <img
                      src={data.is_video ? data.thumbnail : url}
                      alt={data.title}
                    />
                  ) : (
                    <div className='post-text'>{data.selftext}</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className='loader'>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Component;
