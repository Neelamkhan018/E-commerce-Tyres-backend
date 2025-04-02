
import DealerStoreSchema from "../Models/Dealerstoremodel.js";


const adddealerlist = async (req, res) => {
  const { clientId, tyres } = req.body;

  try {
    // Find the dealer list by clientId
    let dealerList = await DealerStoreSchema.findOne({ clientId });

    if (!dealerList) {
      // If it doesn't exist, create a new one
      dealerList = new DealerStoreSchema({ clientId, tyres });
    } else {
      // Update the tyres array
      dealerList.tyres = tyres;
    }

    // Save the dealer list
    await dealerList.save();
    res.status(200).json({ message: 'Dealer list updated successfully' });
  } catch (error) {
    console.error("Error updating dealer list:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };



  const getDealerList = async (req, res) => {
    try {
      const dealerLists = await DealerStoreSchema.aggregate([
        {
          $lookup: {
            from: "tyrebrands", // Assuming your tyre brand collection is named "tyrebrands"
            localField: "tyres",
            foreignField: "_id",
            as: "tyreDetails"
          }
        },
        {
          $project: {
            clientId: 1,
            tyres: { $size: "$tyres" }, // Count the number of tyres
            tyreDetails: 1
          }
        }
      ]);
      res.status(200).json({ dealerLists });
    } catch (error) {
      console.error("Error fetching dealer lists:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


export {adddealerlist , getDealerList }