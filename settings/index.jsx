import * as colors from "./colors";

/**
 * App settings
 * @param {} props 
 */
function settingsComponent(props)
{
	return (
		<Page>
			<Section title="Jumper">
				<Text bold>Your High Score: <Text center>{props.settingsStorage.getItem("highScore")}</Text></Text>
				<Text bold>Lifetime Total: <Text center>{props.settingsStorage.getItem("lifetimeScore")}</Text></Text>
			</Section>
			<Section title="Game Settings">
				<Text bold>Ball Color</Text>
					<ColorSelect
						settingsKey="ballColor"
						colors={ colors.COLOR_LIST }
					/>
				<Text bold>Obstacle Color</Text>
					<ColorSelect
						settingsKey="obstacleColor"
						colors={ colors.COLOR_LIST }
					/>
				<Text bold>Platform Color</Text>
					<ColorSelect
						settingsKey="platformColor"
						colors={ colors.COLOR_LIST }
					/>
				<Text bold>Vibration</Text>
					<Toggle
						settingsKey="jumpVibration"
						label="Jump vibration"
					/>
					<Toggle
						settingsKey="landVibration"
						label="Landing vibration"
					/>
					<Toggle
						settingsKey="endVibration"
						label="Game end vibration"
					/>
					<Text italic>Note: disabling vibration may help preserve battery life.</Text>
				<Text bold>Auto-play</Text>
					<Select
						settingsKey="autoPlay"
						label="Tap here to select an option"
						title="Auto-play options"
						selectViewTitle="Auto-play options"
						options={[
							{ name: "Auto-play: auto-play the game when not playing" },
							{ name: "Static: display a static game when not playing" },
							{ name: "Hidden: hide the game when not playing" }
						]}
					/>
					<Text italic>
						Auto-play will attempt to play the game automatically while you aren't playing.
						Simply tap the screen to stop auto-play and start playing yourself!
					</Text>
					<Text italic>Note: choosing 'Static' or 'Hidden' may help preserve battery life.</Text>
				<Text bold>Game Speed</Text>
					<Slider
						settingsKey="gameSpeed"
						label="Speed"
						min="8"
						max="12"
						step="2"
					/>
			</Section>
			<Section
				title="Clock Settings"
				description={
					<Text italic>
						Clock format (eg. 12hr vs 24hr display) is controlled via your
						<Link source="https://fitbit.com/settings/profile"> Fitbit profile settings</Link> under 'Clock Display Time'
					</Text>
				}
				
			>
				<Text bold>Clock Color</Text>
					<ColorSelect
						settingsKey="clockColor"
						colors={ colors.COLOR_LIST }
					/>
			</Section>
			<Section title="More">
				<Text bold>
					Find more clock faces
					<Link source="http://clocks.empyrn.co"> here</Link>!
				</Text>
				<Text>
					For feedback, support, or questions feel free to send an email to
					<Link source="#"> contact@empyrn.co</Link>.
				</Text>
				<Text>
					All of our clock faces are open source! Tap 
					<Link source="https://github.com/EMPYRN"> here</Link> to view or contribute.
				</Text>
				<Text>
					For payment help or inquiries, visit
					<Link source="https://kiezelpay.com/faq"> KiezelPay here</Link>.
				</Text>
			</Section>
			<Section 
				title="Reset"
				description={
					<Text italic>
						By clicking this button, you will reset all settings on this page to their default values and clear ALL score data.
					</Text>
				}
			>
				<Button
					label="Clear Data & Reset Settings"
					onClick={() => {
						props.settingsStorage.clear();
						props.settingsStorage.setItem("reset", "true");
					}}
				/>
			</Section>
		</Page>
	);
}

registerSettingsPage(settingsComponent);
