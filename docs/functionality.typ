#let image-background = image("./images/background-1.jpg", height: 100%, fit: "cover")
#let image-foreground = image("./images/Logo-Anastasia-Labs-V-Color02.png", width: 100%, fit: "contain")
#let image-header = image("./images/Logo-Anastasia-Labs-V-Color01.png", height: 75%, fit: "contain")
#let fund-link = link("https://milestones.projectcatalyst.io/projects/1100125/milestones/4")[Catalyst Proposal]
#let git-link = link("https://github.com/Anastasia-Labs/money-kit-ui")[Main Github Repo]

#set page(
  background: image-background,
  paper: "a4",
  margin: (left: 20mm, right: 20mm, top: 40mm, bottom: 30mm)
)

#set text(15pt, font: "Barlow")

#v(3cm)

#align(center)[
  #box(
    width: 60%,
    stroke: none,
    image-foreground,
  )
]

#v(1cm)

#set text(22pt, fill: white)

#align(center)[#strong[Money Kit Web UI functionality]]
#set text(20pt, fill: white)
#align(center)[#strong[Version 1.1 – November 2024]]

#v(5cm)

#set text(13pt, fill: white)

#set text(fill: luma(0%))

#show link: underline
#set terms(separator:[: ],hanging-indent: 18mm)

#set par(justify: true)
#set page(
  paper: "a4",
  margin: (left: 20mm, right: 20mm, top: 40mm, bottom: 35mm),
  background: none,
  header: [
    #align(right)[
      #image("./images/Logo-Anastasia-Labs-V-Color01.png", width: 25%, fit: "contain")
    ]
    #v(-0.5cm)
    #line(length: 100%, stroke: 0.5pt)
  ],
)

#v(20mm)

#show link: underline
#show outline.entry.where(level: 1): it => {
  v(6mm, weak: true)
  strong(it)
}

#outline(depth:3, indent: 1em)
#pagebreak()

#set text(size: 11pt)  
#set page(
   footer: [
    #line(length: 100%, stroke: 0.5pt)
    #v(-3mm)
    #align(center)[ 
      #set text(size: 11pt, fill: black)
      *Anastasia Labs – *
      #set text(size: 11pt, fill: gray)
      *Money Kit Web UI functionality*
      #v(-3mm)
      Version 1.4 – October 2024
      #v(-3mm)
    ]
    #v(-6mm)
    #align(right)[
      #counter(page).display("1/1", both: true)]
  ] 
)

#counter(page).update(1)
#v(100pt)

#set terms(separator:[: ],hanging-indent: 18mm)
#align(center)[
  #set text(size: 20pt)
  #strong[Web UI functionality]]
#v(20pt)

#set heading(numbering: "1.")


= Connect Wallet
== Purpose: 
Allow users to connect their Cardano-compatible wallet (e.g., Nami, Eternl) to interact with the DApp.

== Key Features:
- Detect available wallets and display options for connecting.
- Restrict connections to the correct network (Mainnet or Testnet).
- Display the connected wallet's address and network type after successful connection.

== UI Workflow:
=== Display a "Connect Wallet" button.
#align(center)[
  #image("./images/connect_wallet_btn.png", height: 60%, fit: "contain")
]
=== When clicked:
   - If a compatible wallet is available, prompt the user to connect.
   - If no wallet is detected, display a message guiding the user to install one.
#align(center)[
  #image("./images/select_wallet.png", height: 60%, fit: "contain")
]
=== After connection:
   - Show the wallet address and network type.
   - Maintain connection status across the UI.
#align(center)[
  #image("./images/connected_wallet.png", height: 60%, fit: "contain")
]


= Sell (Seller Panel)
== Purpose: 
Enable sellers to deposit funds into the smart contract for selling cryptocurrency in exchange for fiat payment.

== Key Features:
- Input Fields:
  - Select the type of asset to sell (e.g., ADA, custom tokens).
  - Specify the amount to sell.
- Deposit Button:
  - Trigger a transaction to lock funds in the smart contract.
- Wallet Interaction:
  - Integrate with the wallet for signing and submitting the transaction.
- Feedback:
  - Show transaction status (pending, success, or failure).

== UI Workflow:
1. Input asset type (e.g., ADA or custom token).
#align(center)[
  #image("./images/select_asset.png", height: 60%, fit: "contain")
]
#align(center)[
  #image("./images/asset_option.png", height: 60%, fit: "contain")
]
2. Input the amount to sell.
#align(center)[
  #image("./images/input_amount.png", height: 60%, fit: "contain")
]
3. Click "Deposit Funds":

= Transaction Status (Status Panel)
== Purpose: 
Provide an overview of all transactions, including funds currently locked, pending, or released.

== Key Features:
- List of Transactions:
  - Show transaction details:
    - Asset Type
    - Amount
    - Status (e.g., Pending, Locked, Released)
- Actionable Status:
  - Include an "Unlock" button for locked transactions.
- Real-Time Updates:
  - Fetch and update transaction data periodically or on user action.

== UI Workflow:
1. Display a scrollable list of transactions with these columns:
   - Asset Type
   - Amount
   - Status
2. Status-Based Actions:
   - Pending: No actions available.
   - Locked: Show an "Unlock" button to open the Buyer Panel.
   - Released: Marked as completed, no further actions.
3. Display a "No transactions yet" message if the list is empty.

#align(center)[
  #image("./images/unlock.png", height: 60%, fit: "contain")
]

= Buy (Buyer Panel)
== Purpose: 
Allow buyers to provide cryptographic proof of fiat payment and unlock funds in the smart contract.

== Key Features:
- Unlock Button:
  - Appears for locked transactions in the Status Panel.
  - Opens the Buyer Panel for the selected transaction.
- Proof Submission:
  - Input field to paste/upload cryptographic proof.
- Wallet Interaction:
  - Use the wallet to sign and submit proof to the smart contract.
- Feedback:
  - Display success or failure messages for the transaction.

== UI Workflow:
1. Click "Unlock" for a locked transaction in the Status Panel.
2. Enter cryptographic proof in the input field.
3. Click "Unlock Funds":
   - Wallet opens for signing and submitting proof.
   - Funds are unlocked and transferred to the buyer.
4. Display success message with transaction hash.

#align(center)[
  #image("./images/provide_proof.png", height: 60%, fit: "contain")
]

= Summary of User Flows
#show table.cell.where(y: 0): strong
#set table(
  stroke: (x, y) => if y == 0 {
    (bottom: 0.7pt + black)
  },
  align: (x, y) => (
    if x > 0 { center }
    else { left }
  )
)

#table(
  columns: 3,
  table.header(
    [Feature],
    [User Action],
    [Outcome],
  ),
  [Connect Wallet],
  [Click 'Connect Wallet' button.],
  [Wallet connects, UI shows wallet address and network.],
  [Sell (Seller Panel)],
  [Input asset type/amount, click 'Deposit Funds'.],
  [Funds are locked in the smart contract, status updates in the Status Panel.],
  [Transaction Status],
  [View transactions in Status Panel.],
  [User sees transaction statuses and can unlock locked funds.],
  [Buy (Buyer Panel)],
  [Click 'Unlock', provide proof, confirm unlock.],
  [Funds are unlocked and transferred to the buyer.],
)



= Technology Stack

- Frontend:
  - React.js with Next.js for fast, server-rendered UI.
  - TailwindCSS for styling.

- Backend:
  - Node.js/Express API to fetch transaction data and handle proof submissions.

- Blockchain:
  - Lucid library for Cardano wallet integration.
  - Cardano smart contract for locking and releasing funds.

