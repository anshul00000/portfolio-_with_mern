const multer = require("multer");

const path = require('path');


const storage = multer.diskStorage({

        
        destination: (req, image, cb) => {
          
            cb(null, './public/images');
        },
        filename: (req, image, cb) => {
            cb(null, Date.now() + '-' + image.originalname);
    },
    
    
});

  
  const fileFilter = (req, image, cb) => {
    if (
        image.mimetype === 'image/jpeg' || 
        image.mimetype === 'image/png' || 
        image.mimetype === 'image/gif' || 
        image.mimetype === 'image/webp' ||
        image.mimetype === 'image/svg+xml'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  };

  

  const upload = multer({ storage: storage , fileFilter: fileFilter, });


module.exports = upload  ;


