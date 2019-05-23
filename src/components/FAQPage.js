import React from "react";
import {withRouter} from "react-router-dom";

export const FAQPage = () => {

    return (
      <div className="card-blank">
        <div className="p-fluid">
          <div className="p-col-12">
			<h1><b>Frequently asked Questions</b></h1>
            <p><u><b>What is Hashkings?</b></u></p> 
			Hashkings is a virtual Cannabis farming game on the STEEM blockchain. You can lease plots of land, buy seeds and grow your own plants which are then harvested and sold at market. 

			<p><u><b>How do you make money from the game?</b></u></p> 
			When gardeners take care of their plants they grow points toward votes... distributing the inflation 
			controlled by our collective Steem power. This is done by placing our growers as beneficiaries on 
			semi-automated posts, and then voting on these posts. 
			Additionally, any extra game mechanics purchased contribute to our SP... 
			increasing over time the benefits for everybody involved. In short, contribute to the SP and earn the 
			benefactor rewards off the semi-automated posts every one to four days.
			
			<p><u><b>Does it cost money to play?</b></u></p> 
			Yes there is an initial leasing fee for land plots (plus 20 SP delegation) and seeds also cost a small amount of STEEM to purchase.

			<p><u><b>What kind of features will be added in the future?</b></u></p> 
			A graphical inventory and map of planted/available plots, improved dashboard, limited edition seeds, CannaDex internal exchange.
			
			<p><u><b>Where do I begin?</b></u></p> 
			First head over to "Marketplace" and click "Garden Plots" to lease your first plot of land. You can lease one or more up to six. 

			Then click "Seeds" under the "Marketplace" menu and purchase your first seeds

			<p><u><b>What should I do after I plant my seeds?</b></u></p> 
			Go to "Ganja Farm" and click "Garden". There you will find the Water you Garden function.

			<p><u><b>How often should I water my plants?</b></u></p> 
			No more than once per day is fine. 

			<p><u><b>What happens if I forget to water?</b></u></p> 
			If you forget to water your plants will not grow of course and your payouts will also stop. In the future your plant will also die but this has not been incorporated into the game yet.

			<p><u><b>What is the difference between types of seeds and what does experience do?</b></u></p> 
			This is a special feature which will include our very own kief token which will be used to purchase items from the
			grow shop.
			
			<p><u><b>How many garden plots/seeds can I own?</b></u></p> 
			There are a total of 25,200 plots of land available and you can own as many as are available at the time of delegation. At the moment you can own as many seeds as your green thumb can handle.

			<p><u><b>What is CannaDex and what will it do?</b></u></p>
			This is our internal exchange where you will buy and sell various nutrients, grow equipment and seeds
          </div>
        </div>
	  </div>
    );
};

export default withRouter(FAQPage);