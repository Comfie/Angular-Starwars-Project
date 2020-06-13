import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable ({
  providedIn: 'root'
})

export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Wader', side: ''}
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient) {
      this.logService = logService;
      this.http = http;
  }

  fetchCharacters(){
    this.http.get('https://swapi.dev/api/people/')
    .subscribe(
      (data) => {
        const chars = data['results'].map(char => {
          return {name: char.name, side: '', height: char.height, mass: char.mass, gender: char.gender};
        });
        this.characters = chars;
        this.charactersChanged.next(); // this is used to immdiatelly load data when you make a request
        console.log(data);
      }
    );
    // this.http.post('your api', {js object mandatory})
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
        return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }
  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Change side of ' + charInfo.name + ', new side => ' + charInfo.side);
  }

  addCharacter(name, side, height, mass, gender) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;

    }
    const newChar = {name: name, side: side, height: height, mass: mass, gender: gender};
    this.characters.push(newChar);
  }

}
