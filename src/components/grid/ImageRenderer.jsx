import React from 'react';
import Img from 'gatsby-image';

const imageRendererStyles = {
    width: '50px',
    height: '50px',
    margin: 'auto',
    marginTop: '4px',
    borderRadius: '50%'
};

const ImageRenderer = (column) => (
    <Img
        style={imageRendererStyles}
        fluid={column.data.profileImage.childImageSharp.fluid}
    />
);

export default ImageRenderer;
