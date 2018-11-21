const { assert } = require('chai');
const getName = require('../'); // eslint-disable-line unicorn/import-index

describe('Sites', function () {
  this.slow(5000);
  this.timeout(30000);

  describe('Amazon', function () {
    describe('Mini Supermarket Handcart, Shopping Cart Shopping Utility Cart Mode Desk Storage Toy Holder Desk Accessory, Color Random', function () {
      let result;
      before(async function () {
        result = await getName('https://www.amazon.com/Supermarket-Handcart-Shopping-Utility-Accessory/dp/B0722KTW4T/ref=sr_1_8?ie=UTF8');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Mini Supermarket Handcart, Shopping Cart Shopping Utility Cart Mode Desk Storage Toy Holder Desk Accessory, Color Random');
      });
    });

    describe('Cube Thing', function () {
      let result;
      before(async function () {
        result = await getName('https://www.AMAZON.com/Luke-Foreman-Cube-Thing/dp/B00NG84JV4/ref=sr_1_7?ie=UTF8');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Cube Thing');
      });
    });
  });

  describe('BestBuy', function () {
    describe('HP - 2-in-1 14" Touch-Screen Chromebook - Intel Core i3 - 8GB Memory - 64GB eMMC Flash Memory - HP Finish In Ceramic White And Cloud Blue', function () {
      let result;
      before(async function () {
        result = await getName('https://www.bestbuy.com/site/hp-2-in-1-14-touch-screen-chromebook-intel-core-i3-8gb-memory-64gb-emmc-flash-memory-hp-finish-in-ceramic-white-and-cloud-blue/6301869.p?skuId=6301869');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'HP - 2-in-1 14" Touch-Screen Chromebook - Intel Core i3 - 8GB Memory - 64GB eMMC Flash Memory - HP Finish In Ceramic White And Cloud Blue');
      });
    });

    describe('Samsung - 75" Class - LED - NU6900 Series - 2160p - Smart - 4K UHD TV with HDR', function () {
      let result;
      before(async function () {
        result = await getName('https://www.BESTBUY.com/site/samsung-75-class-led-nu6900-series-2160p-smart-4k-uhd-tv-with-hdr/6290167.p?skuId=6290167');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Samsung - 75" Class - LED - NU6900 Series - 2160p - Smart - 4K UHD TV with HDR');
      });
    });
  });

  describe('eBay', function () {
    describe('Nest Learning Thermostat 3rd Generation, Works with Google Home and Amazon Alexa', function () {
      let result;
      before(async function () {
        result = await getName('https://www.ebay.com/itm/Nest-Learning-Thermostat-3rd-Generation-Works-with-Google-Home-and-Amazon-Alexa/223103414932');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Nest Learning Thermostat 3rd Generation, Works with Google Home and Amazon Alexa');
      });
    });

    describe('Apple 13.3" MacBook Air 128GB with Retina Display (2018, Silver) MREA2LL/A', function () {
      let result;
      before(async function () {
        result = await getName('https://www.EBAY.com/itm/Apple-13-3-MacBook-Air-128GB-with-Retina-Display-2018-Silver-MREA2LL-A/202501359082');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Apple 13.3" MacBook Air 128GB with Retina Display (2018, Silver) MREA2LL/A');
      });
    });
  });

  describe('GameStop', function () {
    describe('Nintendo Switch Console with Neon Blue and Neon Red Joy-Con', function () {
      let result;
      before(async function () {
        result = await getName('https://www.gamestop.com/nintendo-switch/consoles/nintendo-switch-console-with-neon-blue-and-neon-red-joy-con/153583');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Nintendo Switch Console with Neon Blue and Neon Red Joy-Con');
      });
    });

    describe('Seagate 2TB Game Drive for PS4', function () {
      let result;
      before(async function () {
        result = await getName('https://www.gamestop.com/ps4/accessories/seagate-2tb-game-drive-for-ps4/151885');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Seagate 2TB Game Drive for PS4');
      });
    });
  });

  describe('Google Express', function () {
    describe('Google Chromecast (2nd Generation) - 1080p - Wi-Fi - Black', function () {
      let result;
      before(async function () {
        result = await getName('https://express.google.com/u/0/product/Google-Chromecast-2nd-Generation-1080p-Wi-Fi-Black/12201320268068482524_12770536777640250214_102760793');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Google Chromecast (2nd Generation) - 1080p - Wi-Fi - Black');
      });
    });

    describe('Nintendo Super Mario Odyssey [Switch Game]', function () {
      let result;
      before(async function () {
        result = await getName('https://express.GOOGLE.com/u/0/product/Nintendo-Super-Mario-Odyssey-Switch-Game/4699429706850701365_8691361685679756397_125181302');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Nintendo Super Mario Odyssey [Switch Game]');
      });
    });
  });

  describe('Kohl\'s', function () {
    describe('Fitbit Ace Kids Activity Tracker', function () {
      let result;
      before(async function () {
        result = await getName('https://www.kohls.com/product/prd-3296135/fitbit-ace-kids-activity-tracker.jsp');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Fitbit Ace Kids Activity Tracker');
      });
    });

    describe('Nintendo Switch Console & Joy-Con Controller Set with Bonus Interworks Controller', function () {
      let result;
      before(async function () {
        result = await getName('https://www.KOHLS.com/product/prd-3239600/nintendo-switch-console-joy-con-controller-set-with-bonus-interworks-controller.jsp');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Nintendo Switch Console & Joy-Con Controller Set with Bonus Interworks Controller');
      });
    });
  });

  describe('Macy\'s', function () {
    describe('Black & Decker Crisp \'N Bake Air Fry Toaster Oven', function () {
      let result;
      before(async function () {
        result = await getName('https://www.macys.com/shop/product/black-decker-crisp-n-bake-air-fry-toaster-oven?ID=6679993');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Black & Decker Crisp \'N Bake Air Fry Toaster Oven');
      });
    });

    describe('Steve Madden Kimmy Tote', function () {
      let result;
      before(async function () {
        result = await getName('https://www.MACYS.com/shop/product/steve-madden-kimmy-tote?ID=6757298');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Steve Madden Kimmy Tote');
      });
    });
  });

  describe('Newegg', function () {
    describe('CORSAIR Vengeance LPX 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model CMK16GX4M2B3000C15R', function () {
      let result;
      before(async function () {
        result = await getName('https://www.newegg.com/Product/Product.aspx?Item=N82E16820233863');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'CORSAIR Vengeance LPX 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model CMK16GX4M2B3000C15R');
      });
    });

    describe('GeIL SUPER LUCE RGB SYNC 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model GLWS416GB3000C16ADC', function () {
      let result;
      before(async function () {
        result = await getName('https://www.NEWEGG.com/Product/Product.aspx?Item=N82E16820158637');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'GeIL SUPER LUCE RGB SYNC 16GB (2 x 8GB) 288-Pin DDR4 SDRAM DDR4 3000 (PC4 24000) Desktop Memory Model GLWS416GB3000C16ADC');
      });
    });
  });

  describe('Target', function () {
    describe('Girls\' 2pc Long Sleeve How To Draw A Panda Graphic Pajama Set - Cat & Jack™ Pink', function () {
      let result;
      before(async function () {
        result = await getName('https://www.target.com/p/girls-2pc-long-sleeve-how-to-draw-a-panda-graphic-pajama-set-cat-jack-153-pink/-/A-53593065?preselect=53511057#lnk=sametab');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Girls\' 2pc Long Sleeve How To Draw A Panda Graphic Pajama Set - Cat & Jack™ Pink');
      });
    });

    describe('Xbox One X', function () {
      let result;
      before(async function () {
        result = await getName('https://www.TARGET.com/p/xbox-one-x/-/A-52637446');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Xbox One X');
      });
    });
  });

  describe('Walmart', function () {
    describe('LEGO City 60201 Kid Children\'s Toy Set 24 Day Advent Calendar Holiday Gift Box', function () {
      let result;
      before(async function () {
        result = await getName('https://www.walmart.com/ip/LEGO-City-60201-Kid-Children-s-Toy-Set-24-Day-Advent-Calendar-Holiday-Gift-Box/210314543');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'LEGO City 60201 Kid Children\'s Toy Set 24 Day Advent Calendar Holiday Gift Box');
      });
    });

    describe('Nerf Zombie Strike Revreaper', function () {
      let result;
      before(async function () {
        result = await getName('https://www.WALMART.com/ip/Nerf-Zombie-Strike-Revreaper/942349359');
      });

      it('should have correct name', function () {
        assert.strictEqual(result.name, 'Nerf Zombie Strike Revreaper');
      });
    });
  });
});

/* Example to use to create tests for a site
describe('', async function() {
  describe('', async function() {
    let result;
    before(async function() {
      result = await getName('');
    });

    it('should have correct name', async function() {
      assert.strictEqual(result.name, '');
    });
  });

  describe('', async function() {
    let result;
    before(async function() {
      result = await getName('');
    });

    it('should have correct name', async function() {
      assert.strictEqual(result.name, '');
    });
  });
});
*/
