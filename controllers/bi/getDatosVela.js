//const { dataDealerMsSQL } = require("../models/dealer");

const getDatosVela = async (req, res) => {
  try {
    const { data } = {
      data: [
        {
          x: ["semana +1", "semana +2", "semana +3", "semana +4", "semana +5"],
          open: [133.78, 128.66, 170.62, 215.41, 133.75],
          hight: [159.71, 189.49, 222.27, 190, 135.38],
          low: [132.94, 128.55, 165.04, 180.42, 130.93],
          close: [150.83, 160.03, 212.29, 153.99, 153.99],
          volumen: [90757301, 104319501, 753294000, 92403800, 92403800],
        }
      ],
    };

    

    let tipoVela1 = data;
    return res.send({
  "data": /*[
    [1609459200000, 735.2, 759.49, 719.15, 753.72],
    [1609545600000, 753.72, 772.4, 748.72, 770.88],
    [1609632000000, 770.88, 774.55, 747.51, 748.8],
    [1609718400000, 748.8, 769.65, 744.44, 762.78],
    [1609804800000, 762.78, 767.4, 735.36, 735.44],
    [1609891200000, 735.44, 747.54, 720.0, 725.15],
    [1609977600000, 725.15, 734.14, 697.32, 732.23],
    [1610064000000, 732.23, 739.67, 685.12, 697.66],
    [1610150400000, 697.66, 702.93, 652.23, 700.38],
    [1610236800000, 700.38, 704.0, 676.29, 694.95],
    [1610323200000, 694.95, 731.07, 682.22, 726.88],
    [1610409600000, 726.88, 753.05, 712.22, 738.9],
    [1610496000000, 738.9, 765.22, 728.03, 735.07],
    [1610582400000, 735.07, 743.49, 686.13, 701.62],
    [1610668800000, 701.62, 729.9, 697.18, 728.15],
    [1610755200000, 728.15, 738.21, 705.83, 717.33],
    [1610841600000, 717.33, 725.67, 701.5, 714.5],
    [1610928000000, 714.5, 727.0, 691.25, 722.62],
    [1611014400000, 722.62, 732.67, 714.36, 729.77],
    [1611100800000, 729.77, 745.0, 717.1, 739.62],
    [1611187200000, 739.62, 742.0, 706.5, 742.78]
  ]*/

  [
    [
    1614004200000,
    128.01,
    129.72,
    125.6,
    126,
    103916400
    ],
    [
    1614090600000,
    123.76,
    126.71,
    118.39,
    125.86,
    158273000
    ],
    [
    1614177000000,
    124.94,
    125.56,
    122.23,
    125.35,
    111039900
    ],
    [
    1614263400000,
    124.68,
    126.46,
    120.54,
    120.99,
    148199500
    ],
    [
    1614349800000,
    122.59,
    124.85,
    121.2,
    121.26,
    164560400
    ],
    [
    1614609000000,
    123.75,
    127.93,
    122.79,
    127.79,
    116307900
    ],
    [
    1614695400000,
    128.41,
    128.72,
    125.01,
    125.12,
    102260900
    ],
    [
    1614781800000,
    124.81,
    125.71,
    121.84,
    122.06,
    112966300
    ]]
});
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getDatosVela,
};
