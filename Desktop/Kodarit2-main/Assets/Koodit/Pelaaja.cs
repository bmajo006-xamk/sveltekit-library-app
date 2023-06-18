using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pelaaja : MonoBehaviour
{
    private Rigidbody2D pelaaja;
    public float nopeus = 5f;
    public float hyppyvoima = 5f;
    private float vaakaSuunta;
    private Vector2 liike;

    // Start is called before the first frame update
    void Start()
    {
        pelaaja = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        vaakaSuunta = Input.GetAxisRaw("Horizontal");
        liike.x = vaakaSuunta * nopeus;

        //tehdään hyppy
        if(Input.GetKeyDown("space")){
            pelaaja.AddForce(Vector2.up * hyppyvoima, ForceMode2D.Impulse);
        }
    }//update

    void FixedUpdate(){
        pelaaja.position += liike * Time.fixedDeltaTime;
    }//fixedupdate

    void OnTriggerStay2D(Collider2D collision){
        if (collision.gameObject.CompareTag("alusta")){
            Debug.Log("Osui alustaan");
        }

    }


}//class
