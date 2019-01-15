import * as CryptoJS from 'crypto-js'

class Block {
    public index: number
    public hash: string
    public previousHash: string
    public data: string
    public timestamp: number
    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index
        this.hash = hash
        this.previousHash = previousHash
        this.data = data
        this.timestamp = timestamp
    }

    static calculateBlockHash = (index: number, previousHash: string, data: string, timestamp: number): string => {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    }

    static validateStructure = (aBlock: Block): boolean => {
        return typeof aBlock.index === 'number'
        && typeof aBlock.hash === 'string' 
        && typeof aBlock.previousHash === 'string' 
        && typeof aBlock.timestamp === 'number'
        && typeof aBlock.data === 'string'
    }
}

class Blockchain {
    private blockchain: Block[]
    constructor() {
        const genesisBlock: Block = new Block(0, '111', '222', '333', 222)
        this.blockchain = [genesisBlock]
    }

    getBlockchain = (): Block[] => this.blockchain
    getLastBlock = (): Block => this.blockchain[this.blockchain.length - 1]
    getNewTimeStramp = (): number => Math.round(new Date().getTime() / 1000)
    createNewBlock = (data: string): Block => {
        const previousHash: Block = this.getLastBlock()
        const newIndex: number = previousHash.index + 1
        const newTimestramp: number = this.getNewTimeStramp()
        const newHash: string = Block.calculateBlockHash(newIndex, previousHash.hash, data, newTimestramp)
        const newBlock: Block = new Block(
            newIndex,
            newHash,
            previousHash.hash,
            data,
            newTimestramp
        )
        this.addBlock(newBlock)
        return newBlock
    }
    isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
        if (!Block.validateStructure(candidateBlock)) {
            return false
        }
        if (previousBlock.index + 1 !== candidateBlock.index) {
            return false
        }
        if (previousBlock.hash !== candidateBlock.previousHash) {
            return false
        }
        if (this.getHashforBlock(candidateBlock) !== candidateBlock.hash) {
            return false
        }
        return true
    }

    getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp)
    addBlock = (candidateBlock: Block) => {
        if(this.isBlockVaild(candidateBlock, this.getLastBlock())) {
           this.blockchain.push(candidateBlock)
        }
    }
}

const blockchain = new Blockchain()
blockchain.createNewBlock('hello1')
blockchain.createNewBlock('hello2')
blockchain.createNewBlock('hello3')
console.log(blockchain.getBlockchain())

export {}