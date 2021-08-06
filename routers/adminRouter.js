const express = require("express");
const {
  buatAkunRS,
  buatAkunPMI,
  login,
  membuatArtikel,
  deleteArtikel,
  premiumUser,
  membuatReward,
} = require("../controllers/adminController");

const { authenticateToken, permit } = require("../middleware/auth");
const upload = require("../middleware/image-uploader");
const { validate } = require("../middleware/validation");
const {
  loginSchema,
  buatAkunRSSchema,
  buatAkunPMISchema,
  membuatRewardSchema,
} = require("../middleware/validation/schema/adminSchema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post(
  "/buat-akun-rs",
  validate(buatAkunRSSchema),
  authenticateToken,
  permit("admin"),
  buatAkunRS
);
router.post(
  "/buat-akun-pmi",
  validate(buatAkunPMISchema),
  authenticateToken,
  permit("admin"),
  buatAkunPMI
);
router.post(
  "/post-artikel",
  authenticateToken,
  permit("admin"),
  upload,
  membuatArtikel
);
router.put(
  "/premium-user/:id",
  authenticateToken,
  permit("admin"),
  premiumUser
);
router.delete(
  "/delete-artikel/:id",
  authenticateToken,
  permit("admin"),
  deleteArtikel
);
router.post(
  "/post-reward",
  validate(membuatRewardSchema),
  authenticateToken,
  permit("admin"),
  membuatReward
);

module.exports = router;
