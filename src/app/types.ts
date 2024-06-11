export type BancConfig = {
	Name: string
	Cards: Card[]
	Etats: Etat[]
	Commandes: Commande[]
	Networking: ConfigNetworking[]
}

// GPIO Config Side

export type Card = {
	cardType?: string
	cardName: string
	pins: CardPin[]
}
export type CardPin = {
	GPIO: {
		Module:  number
		Pin: number
	},
	PinName: string,
	NumberOnCard: string,
	state?: boolean
}
export type GPIOModule = {
	defaultState: number,
	API_Address: number,
	I2C_Address_HEX: string // HEX value "0x2F" stored as a string --> so you need to parseInt,
	registers: number[] // 2 8bit HEX register stored
}
export type Pinout = {
	pins: number[]
	GPIO_register_address_HEX: string // HEX value "0x2F" stored as a string --> so you need to parseInt
	IODIR_register_address_HEX: string // HEX value "0x2F" stored as a string --> so you need to parseInt
	register_number: number
}
export type AppModulePin = {
  module: number,
  pin: number,
  state: number,
  GPIO_register: string
  IODIR_register: string
}

// Scripting Side

export type Etat = {
	category: string
	actualCode: number
	actualState?: EtatState
	states: EtatState[]
}
export type EtatState = {
	name: string
	code: number
	outputs: OutputCommandOrState[]
}
export type OutputCommandOrState = {
	NumberOnCard: string
	state: false
	cards: string[]
}

export type Commande = {
	Name: string
	shortName: string
	cardType: string
	conditions: CommandeCondition[][]
	outputs: OutputCommandOrState[]
}
export type CommandeCondition = {
	category: string
	code: number
}

// Network Config side

export type ConfigNetworking = {
	name: string
  des: string
	quantity: number
	addresses: DeviceNetworkParams[]
}
export type DeviceNetworkParams = {
	IP: string,
	SubnetMask: string
	IsAlive?: boolean
}

// API Response Type

export type API_ResponseType = {
	date: number // Time as the 32 bits value of time
	data: any
	status: {
		code: number,
		message?: string
	}
}
