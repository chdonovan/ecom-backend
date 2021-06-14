const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// find one
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// tag update
router.put('/:id', (req, res) => {
  Tag.update(
    {
        tag_name: req.body.tag_name
    },
    {
        where: {
            id: req.params.id
        }
    }
  )
  .then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
// delete tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
