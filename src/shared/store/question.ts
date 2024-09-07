import { makeAutoObservable } from 'mobx'
import { Question as TQuestion } from '../types'

class Question {
  posts: TQuestion[] = []

  constructor() {
    makeAutoObservable(this) // , {} <-- За чем следить, {deep: true}
  }

  // updateBalance(value: number) {
  //   this.balance += value;
  // }

  // createTransaction(transaction: Transaction) {
  //   this.transactions.push(transaction)
  // }

  // getLastTransaction() {
  //   return this.transactions[this.transactions.length - 1];
  // }
}

export default new Question()
