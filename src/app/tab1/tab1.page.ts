import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface Friend {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public friends: Friend[];

  constructor(
    private localStorage: Storage,
    public alertCtrl: AlertController,
  ) { }

  async ngOnInit() {
    this.localStorage.create();
    this.friends = await this.localStorage.get('friends');
    if (!this.friends) {
      this.friends = new Array(0);
    }
  }

  public async changeItem(item: number) {
    const editWindow = await this.alertCtrl.create({
      message: 'edit Friend info',
      inputs: [
        { name: 'name', value: this.friends[item].name },
        { name: 'email', value: this.friends[item].email },
        { name: 'phone', value: this.friends[item].phone },
      ],
      buttons: [
        { text: 'cancel' },
        {
          text: 'OK',
          handler: data => {
            if (data.name !== '' && data.email !== '') {
              this.friends[item].name = data.name;
              this.friends[item].email = data.email;
              this.friends[item].phone = data.phone;
              this.localStorage.set('friends', this.friends);
            }
          }
        }
      ]
    });
    await editWindow.present();
  }

  public async addItem() {
    const addWindow = await this.alertCtrl.create({
      message: 'add new Friend info',
      inputs: [
        { label: 'Name ', name: 'name', placeholder: 'Name of friend' },
        { label: 'email', name: 'email', placeholder: 'email address' },
        { label: 'phone', name: 'phone', placeholder: 'telephone number' },
      ],
      buttons: [
        { text: 'cancel' },
        {
          text: 'OK',
          handler: data => {
            if (data.name !== '' && data.email !== '') {
              this.friends.push({
                name: data.name,
                email: data.email,
                phone: data.phone,
              });
              this.localStorage.set('friends', this.friends);
            }
          }
        }
      ]
    });
    await addWindow.present();

  }
}
