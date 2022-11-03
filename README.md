# Dyne's Vault Memorization
<p>Have you ever played the <a href="https://discworld.starturtle.net/lpc/">Discworld MUD</a> and felt like you have a lot of things spread out all over the Disc, but can't remember what you put where?</p>
<h3>Now there is a solution for that!</h3>
<p>If you use the popular MUSHclient, you can add this plugin to let it memorize the containers and their contents for you!</p>
<h3>How to use:</h3>
<p>To add a vault, first look at your chosen container, then use the 'vaultsAdd'-command!</p>
</h4>The following (case-sensitive) commands are available:</h4>
<ul>
  <li>'vaultsAdd': Adds a vault to the list (auto-overwrites).</li>
  <li>'vaults': Shows your current list of vaults.</li>
  <li>'vaultsShow <vault>': Shows chosen vault contents if in list.</li>
  <li>'vaultsRemove <vault>': Removes chosen vault if in list.</li>
  <li>'vaultsHelp': Shows this information.</li>
 </ul>
 <h3>How to install:</h3>
 <p>Here is how you can do it in just a few easy steps:</p>
 <ol>
  <li>Download the .xml-file and save it wherever you will find it.</li>
  <li>Start MUSHclient and go to <i>File -> Plugins</i> (Shift+Ctrl+P).</li>
  <li>Click the <i>"Add..."</i>-button.</li>
  <li>Navigate to the folder where you saved the .xml-file and open it.</li>
  <li>Now you can close the <i>Plugins</i> dialogue window and start using it!</li>
 </ol>
<h3>Troubleshooting:</h3>
<h4>Q: It seems I've recorded two containers into the same entry?</h4>
<p><b>A:</b> Yes, this can happen if you opened multiple containers in a row. The plugin just reads the most recent 50 lines and identifies the containers it encounters, and records them to the entry.<br><b>Solution so far:</b> Take a few steps to ensure your container text is not within 35 lines of another container.</p>
<h4>Q: Does it automatically sort vaults for different characters?</h4>
<p><b>A:</b> No, it does not. But there is nothing preventing you from naming a vault, for instance, 'CharName|VaultName'!</p>
