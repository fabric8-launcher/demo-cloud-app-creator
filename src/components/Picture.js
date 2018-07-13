import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';

const isImage = value => value && value.startsWith('/images/');

const content = value => (
  <div className="picture">
    {!isImage(value) && (<Icon name={value} />)}
    {isImage(value) && (<Image src={value} />)}
  </div>
);

const Picture = (props) => props.value && content(props.value);

Picture.propTypes = {
  value: PropTypes.string,
};

Picture.defaultProps = {
  value: null,
};

export default Picture;
